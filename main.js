var express=require("express");
//middleware - irá fazer um parser do dados do front e formatar em req.body
var bodyParser = require('body-parser')
//framework express
var app=express();
// 3000 is an example port
const port = process.env.PORT || 8000
//express-handlebars - https://github.com/ericf/express-handlebars
const { engine }   = require('express-handlebars');
// define a extensão e a instância do handlebars com o 
//modelo que será interpretado o código  . Todos arquivos html devem terminar
//com .hbs

const service=require("./services/cadastro.service");



app.engine('hbs', engine({extname: '.hbs',defaultLayout: null}));

// define qual o template a ser utilizado no express
app.set('view engine', 'hbs');
//define onde estão as views .hbs
app.set("views", "./views");
//define o uso do body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/", function(req,res){
    res.render('form',{})
});

app.get("/info", async function(req,res){
    const response= await service.getInfo();
    console.log(response.data.user);
    res.render('form',{codigo_usuario:12345,nome_usuario:"joao"})
    
});

app.post("/gravarpessoa", async function(req,res){
    
    const response= await service.salvaCadastrocliente({codigo:req.body.codigo,
                                                 nome:req.body.nome,
                                                 endereco:req.body.endereco});
    console.log(response.data);
    res.render('form');
    
});

app.get("/buscarTodospessoa", async function(req,res){
    const {data}= await service.getDadoscliente();
    console.log(data);
    res.render('form',data)
    
});

app.post("/gravarproduto", async function(req,res){
    
    const response= await service.salvaCadastroproduto({codigo:req.body.codigo,
                                                 descricao:req.body.descricao,
                                                 unidademedida:req.body.unidademedida,
                                                 precoun:req.body.precoun,
                                                 estoque:req.body.estoque});
    console.log(response.data);
    res.render('form');
    
});

app.get("/buscarTodosproduto", async function(req,res){
    const {data}= await service.getDadosproduto();
    console.log(data);
    res.render('form',data)
    
});


app.get("/buscarpessoa/:key", async function(req,res){
    const key=req.params.key;
    const {data}= await service.getDadosPorChave(key);
    console.log(data);
    res.render('form',{data})
    
});




app.listen(port,function(){
    console.log("Frontend está rodando na porta:"+port);
})