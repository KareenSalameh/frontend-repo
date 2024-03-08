import {  FieldValues, useForm } from 'react-hook-form';

// interface FormData {
//     name: string;
//     age: number;
//     password: string;
// }

function StudentForm(){   

    const { register, handleSubmit, formState } = useForm()

    const onSubmit = (data: FieldValues) => {
        console.log("on submit");
        console.log(data)
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
                <label htmlFor="name" >Name</label>
                <input {...register("name", {required:true, minLength:2, maxLength:20})} type="text" id="name" className="form-control"/>
                {formState.errors.name?.type == 'required' && <div className="text-danger">Name is required</div>}
                {formState.errors.name?.type == 'minLength' && <div className="text-danger">Name is too short</div>}
                {formState.errors.name?.type == 'maxLength' && <div className="text-danger">Name is too long</div>}

            </div>
            <div className="mt-3">
                <label htmlFor="age" >Age</label>
                <input {...register("age", {required:true})} type="number" id="age" className="form-control"/>
                {formState.errors.age?.type == 'required' && <div className="text-danger">Age is required</div>}
            </div>
            <div className="mt-3">
                <label htmlFor="password" >password</label>
                <input {...register("password",{required:true,minLength:4, maxLength:10})} type="password" id="password" className="form-control"/>
                {formState.errors.password?.type == 'required' && <div className="text-danger">Password is required</div>}
                {formState.errors.password?.type == 'minLength' && <div className="text-danger">Password is too short</div>}
                {formState.errors.password?.type == 'maxLength' && <div className="text-danger">Password is too long</div>}
            </div>
            
            <div className="mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
                
                
        </form>
    )
}
export default StudentForm
// import React, { useRef } from 'react';
// function StudentForm(){   
//      //using useRef to get the value of the input field to send it as json to server

//     const nameRef = useRef<HTMLInputElement>(null);
//     const ageRef = useRef<HTMLInputElement>(null);
//     const passRef = useRef<HTMLInputElement>(null);


//     const onSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const student = {
//             name : "",
//             age:0,
//             password:""
//         }
//         if(nameRef.current?.value){
//             student.name = nameRef.current.value
//         }
//         if(ageRef.current?.value){
//             student.age = parseInt(ageRef.current.value)
//         }
//         if(passRef.current?.value){
//             student.password = passRef.current.value
//         }
//         console.log(student)

//     }
//     return(
//         <form onSubmit={onSubmit}>
//             <div className="mt-3">
//                 <label htmlFor="name" >Name</label>
//                 <input ref={nameRef} type="text" id="name" className="form-control"/>
//             </div>
//             <div className="mt-3">
//                 <label htmlFor="age" >Age</label>
//                 <input ref={ageRef} type="number" id="age" className="form-control"/>
//             </div>
//             <div className="mt-3">
//                 <label htmlFor="password" >password</label>
//                 <input ref={passRef} type="password" id="password" className="form-control"/>
//             </div>
            
//             <div className="mt-3">
//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </div>
                
                
//         </form>
//     )
// }
// export default StudentForm