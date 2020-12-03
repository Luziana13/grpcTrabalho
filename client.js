// definição do caminho do arquivo proto
const PROTO_PATH = "./AluguelImovel.proto";
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

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

const client = new protoDescriptor.ImovelService('localhost:50051', grpc.credentials.createInsecure());



// Caso que cadsatra um imovel reserva o mesmo alem de as datas do mesmo listas todos os imoveis e tentar reservar novamente
client.CadastrarImovel({codigo: "555", nome: "Bacon", tipo: "AP", endereco: "rua Deus nso ajuda vai da certo"}, function(err,response){
    console.log("CADASTRO DE IMOVEL");
    if(err!=null){
        console.log("erro");
        return;
    }
    console.log("Cadastro realizado com sucesso");
    console.log("\n");
    client.datasDisponiveisParaAluguel({codigo: "555"}, function(err,response){
    console.log("DATAS DISPONÍVEIS PARA UM IMOVEL");
        if(err!=null){
            console.log("erro");
            return;
        }
       
        const resp = response.resposta;
        console.log(resp);
        console.log("\n");
       
    });
    client.ReservarUmImovel({codigo: "555", dataInicial: "10-20-2020", dataFinal: "10-30-2020"}, function(err,response){
        console.log("RESERVAR UM IMOVEL");
        if(err!=null){
            console.log("erro");
            return;
        }
       
        const resp = response.resposta;
        console.log(resp);
        console.log("\n");
    
    });
    client.ReservarUmImovel({codigo: "555", dataInicial: "10-23-2020", dataFinal: "10-30-2020"}, function(err,response){
        console.log("RESERVAR UM IMOVEL");
        if(err!=null){
            console.log("erro");
            return;
        }
       
        const resp = response.resposta;
        console.log(resp);
        console.log("\n");
    
    });
    client.ReservarUmImovel({codigo: "555", dataInicial: "01-23-2020", dataFinal: "02-30-2020"}, function(err,response){
        console.log("RESERVAR UM IMOVEL");
        if(err!=null){
            console.log("erro");
            return;
        }
       
        const resp = response.resposta;
        console.log(resp);
        console.log("\n");
    
    });
    client.listarImoveisDisponiveis({}, function(err,response){
        console.log("DATAS QUE OS IMOVEIS ESTARAM DISPONÍVEL");
        if(err!=null){
            console.log("erro");
            return;
        }
    
        const lista = response.resposta;
        console.log(lista);
        console.log("\n");
       
    });
    client.ReservarUmImovel({codigo: "555", dataInicial: "10-20-2020", dataFinal: "10-30-2020"}, function(err,response){
        console.log("RESERVAR UM IMOVEL");
        if(err!=null){
            console.log("erro");
            return;
        }

        const resp = response.resposta;
        console.log(resp);
        console.log("\n");
    
    });


});


