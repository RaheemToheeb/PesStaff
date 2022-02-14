pesStaffs=require("./pes.json");
const req =require("express/lib/request")
const {writeFile}=require("./model")
// express intance must always comes before app.use
const express= require("express");
const app= express()
app.use(express.json())

const port = 4040;
app.get("/api/pes",(req,res)=>{
    try{
        // check if data base contain staffsData
        if(pesStaffs.lenght<1){
            res.json({message:"Pes data base is empty"})
        }else{
            res.status(200).json({message:"List of pes staffs",data:pesStaffs})
        }

    }catch(error){
        console.log(error.message)
    }
})

/*Targeting one staff using index positions

app.get("/api/pes",(req,res)=>{
    try{
        // check if data base contain staffsData
        if(pesStaffs.lenght<1){
            res.json({message:"Pes data base is empty"})
        }else{
            res.status(200).json({message:"List of pes staffs",data:pesStaffs[2]})
        }

    }catch(error){
        console.log(error.message)
    }
})*/

// Targeting staff by identifier
app.get("/api/pes/:id",(req,res)=>{
    try{
        // get the id
        id=parseInt(req.params.id)
        pesStaff=pesStaffs.find((pes)=>pes.id===id);
        if(!id){
            res.json({message:"The id is not valid in pes data base"})
        }else{
            res.status(200).json({message:"Here is the biodata of staff with the id",data:pesStaff})
        }

    }catch(error){
        console.log(error.message)
    }
})

// creating data in to pes data base
app.post("/api/pes",(req,res)=>{
     const newStaff = {
         id:pesStaffs.length +1,
         name:req.body.name, 
         center:req.body.center, 
         speciality:req.body.speciality, 
         salary:req.body.salary

     }
     pesStaffs.push(newStaff)
     writeFile("./pes.json",JSON.stringify(pesStaffs))
     res.status(201).json({message:"Here is the details of our new staff",data:newStaff})
})

app.patch("/api/pes/:id",(req,res)=>{
    try{
        const id =parseInt(req.params.id)
      const  staffId=pesStaffs.find((aff)=>aff.id===id);

            staffId.name=req.body.name,
            staffId.center=req.body.center,
            staffId.speciality=req.body.speciality,
            staffId.salary=req.body.salary 

            res.status(200).json({message:"Data updated",data:staffId})
        


    }catch(error){
        console.log(error.message)
    }
})


app.delete("/api/pes/:id",(req,res)=>{
    try {
        id=parseInt(req.params.id);
       const  staffId=pesStaffs.find((aff)=>aff.id===id);
        if(!id){
            res.status(404).json({message:`This Id is not valid ${req.params.id}`})
        }else{

            // check for the index position of the id we want to deleted

            const index=pesStaffs.indexOf(staffId);
            pesStaffs.splice(index, 1)
            res.status(200).json({message:`Citizen with Id ${req.params.id} was deleted succesfully`})

        }
        
    } catch (error) {
        console.log(error.message)
    }
})

// Update of Data is similar to create just that we are targeting Id here

app.listen(port,()=>{
    console.log(`I am active on ${port}`)
})