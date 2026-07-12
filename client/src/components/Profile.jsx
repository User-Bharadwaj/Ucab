import Unav from "./Unav";

function Profile(){

 const user = JSON.parse(localStorage.getItem("user")) || {};


 return(

  <>

   <Unav />

   <div className="container mt-5">

    <div className="card shadow p-5 mx-auto"
      style={{maxWidth:"500px"}}>

      <h2 className="text-center mb-4">
        User Profile
      </h2>


      <p>
        <b>Name:</b> {user.name || user.fullName}
      </p>


      <p>
        <b>Email:</b> {user.email}
      </p>


      <p>
        <b>Role:</b> {user.role || "User"}
      </p>


    </div>

   </div>

  </>

 );

}


export default Profile;