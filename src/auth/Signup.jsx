import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    name: '', last_name: '', email: '', username: '', password: ''
  });

  // Function to handle dynamic form input updates
  function getData(field, e) {
    setFormData({ ...formData, [field]: e.target.value });
    setError({...error , [field]:""});
  }

  // Function to handle form submission
  function handleSubmitForm(e) {
    e.preventDefault();

    setError({
      name: '', email: '', username: '', password: ''
    });

    const emptyFields = Object.keys(formData).filter(key => formData[key].trim() === '');
    
    emptyFields.forEach((key) => {
      if (key !== 'last_name') {
        setError(prevError => ({
          ...prevError,
          [key]: 'This Field is Required.'
        }));
      }
    });

    if (emptyFields.length === 1) {
      fetch("http://localhost/Barq/register.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(formData)
      }).then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  }

  return (
    <div className="w-full h-[730px] bg-[#d5d9df] flex justify-center items-center">
      <div className="w-[34%] h-[560px] bg-white rounded-t-lg rounded-b-lg">
        <div className="w-full h-24 rounded-t-lg my_bg flex justify-center items-center">
          <h1 className="text-3xl font-bold text-white font-[sans-serif] ">Sign Up</h1>
        </div>
        <div className="w-full h-96 px-7 pt-5 ">
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="name" className="text-[16px] font-[sans-serif] text-[#000000d1] font-bold">
                  Name <span className="text-xs pl-1 text-red-500 font-semibold">{error.name}</span>
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) => getData('name', e)}
                  className="h-10 bg-[#d4d9df70] rounded-md pl-2 text-lg font-semibold"
                />
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="last_name" className="text-[16px] font-[sans-serif] text-black font-bold">
                  Last name <span className="text-xs pl-1 text-red-500 font-semibold">{error.last_name}</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => getData('last_name', e)}
                  className="h-10 bg-[#d4d9df70] rounded-md pl-2 text-lg font-semibold"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="text-[16px] font-[sans-serif] text-black font-bold">
                Username <span className="text-xs pl-1 text-red-500 font-semibold">{error.username}</span>
              </label>
              <input
                type="text"
                required
                onChange={(e) => getData('username', e)}
                className="h-10 bg-[#d4d9df70] rounded-md pl-2 text-lg font-semibold"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-[16px] font-[sans-serif] text-black font-bold">
                Email <span className="text-xs pl-1 text-red-500 font-semibold">{error.email}</span>
              </label>
              <input
                type="email"
                required
                onChange={(e) => getData('email', e)}
                className="h-10 bg-[#d4d9df70] rounded-md pl-2 text-lg font-semibold"
                />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-[16px] font-[sans-serif] text-black font-bold">
                Password <span className="text-xs pl-1 text-red-500 font-semibold">{error.password}</span>
              </label>
              <input
                type="password"
                onChange={(e) => getData('password', e)}
                minLength={6}
                className="h-10 bg-[#d4d9df70] rounded-md pl-2 text-lg font-semibold"
              />
            </div>
            <div className="flex flex-col w-full pt-4">
              <button
                type="submit"
                className="text-xl font-bold font-[sans-serif] text-white my_bg w-full h-10 bg-[#d4d9df70] rounded-md"
              >
                Signup
              </button>
            </div>
            <div className="flex w-full pt-1 justify-center">
              <p className="text-black text-base font-semibold">
                Already Have An Account? <span className="font-bold">Login</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
