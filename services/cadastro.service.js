const api=require("./api");


async function getInfo(){
   try {
     return await api.get("/getInfo");   
   } catch (error) {
     console.log("Error: "+error)
   }     
}


async function salvaCadastrocliente(dados){
    try {
      console.log(dados)
      return await api.post("/clientes/salvar",{...dados});   
    } catch (error) {
      console.log("Error: "+error)
    }     
 }

 async function getDadoscliente(){
  try {
    return await api.get("/clientes/listar");   
  } catch (error) {
    console.log("Error: "+error)
  }     
}

async function salvaCadastroproduto(dados){
  try {
    console.log(dados)
    return await api.post("/produto/salvar",{...dados});   
  } catch (error) {
    console.log("Error: "+error)
  }     
}

async function getDadosproduto(){
try {
  return await api.get("/produto/listar");   
} catch (error) {
  console.log("Error: "+error)
}     
}

async function getDadosPorChave(key){
  try {
    return await api.get("/clientes/listar/"+key);   
  } catch (error) {
    console.log("Error: "+error)
  }     
}


module.exports={
    getInfo,
    salvaCadastrocliente,
    salvaCadastroproduto,
    getDadoscliente,
    getDadosproduto,
    getDadosPorChave
}