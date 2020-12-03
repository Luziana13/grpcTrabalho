const PROTO_PATH = ("./AluguelImovel.proto");
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Cliente= require('./util/Cliente');
const Imovel = require('./util/Imovel');


// carregamento do arquivo proto e geração das definições
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).AluguelImovel;

const imoveis =[];

const imovel1 = new Imovel("12311",  "casa do joao", "AP", "rua A, n 12 centro");
const imovel2 = new Imovel("1233",  "QUITANDINHA DO OPA", "QUARTO", "rua B, n 12 centro");
const imovel3 = new Imovel("13",  "CASA DA MÃE JOANA", "AP", "rua C, n 12 centro");
const imovel4 = new Imovel("1",  "BBhouse", "QUARTO", "rua D, n 12 centro");
const cadastrarImovelTeste = function (imoveis, imovel){
    imoveis.push(imovel);
}
cadastrarImovelTeste(imoveis, imovel1);
cadastrarImovelTeste(imoveis, imovel2);
cadastrarImovelTeste(imoveis, imovel3);
cadastrarImovelTeste(imoveis, imovel4);

const RealizarReserva = (call, callback) =>{
    console.log("RealizarReserva");
    const codigoImovel = call.request.codigo;
    const dataInicial = call.request.dataInicial;
    const dataFinal = call.request.dataFinal;
    const imovel = imoveis.find(i => i.codigo == codigoImovel);
     var resposta =  imovel.reservar(dataInicial, dataFinal);
    callback(null, {
        resposta: resposta
    });
}

const cadastrarImovel = (call, callback) =>{
    console.log("cadastrarImovel");
    const codigo = call.request.codigo;
    const nome = call.request.nome;
    const tipo = call.request.tipo;
    const endereco = call.request.endereco;

    const imovel = new Imovel(codigo,  nome, tipo, endereco);
    cadastrarImovelTeste(imoveis, imovel);
  
    callback(null, {});
}

const listarImoveisDisponiveis = (call, callback) =>{
    var listaResposta = [];
    const clienteTeste = new Cliente("José", "123000123-20");
    listaResposta = clienteTeste.ImoveisDisponiveis(imoveis);
    console.log(listaResposta);

    callback(null, {
        resposta: listaResposta
    });
}
const datasDisponiveisParaAluguel = (call, callback) =>{
    const codigoImovel = call.request.codigo;
    const imovel = imoveis.find(i => i.codigo == codigoImovel);
    const clienteTeste = new Cliente("José", "123000123-20");
    var resposta = clienteTeste.datasDisponiveis(imoveis,codigoImovel);
   
    callback(null, {
        resposta: resposta
    });
}
function getServer() {
    var server = new grpc.Server();
    server.addService(protoDescriptor.ImovelService.service, {
        ReservarUmImovel: RealizarReserva,
        ListarImoveisDisponiveis: listarImoveisDisponiveis,
        CadastrarImovel: cadastrarImovel,
        DatasDisponiveisParaAluguel: datasDisponiveisParaAluguel
    });
    return server;
    }
    var routeServer = getServer();
    routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    routeServer.start();
      