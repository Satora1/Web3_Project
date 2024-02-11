const SignupValidation=(values)=>{
    let error={}
    const email_pattern=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    const password_pattern = /^(?=.*\d).{6,}$/;
if(values.name===''){
    error.name="Name should not be empty"
}

else {
    error.name=""
}

if(values.email===''){
    error.email="Email should not be empty"
}
else if(!email_pattern.test(values.email)){
    error.email="Email didnt match"
}
else {
    error.email=""
}
if(values.password===''){
   error.password="Password shuld not be empty" 
}
else if(!password_pattern.test(values.password)){
error.password="Password didnt match"
}
else{error.password=''}
return error;
}
export default SignupValidation;