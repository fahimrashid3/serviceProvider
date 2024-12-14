import { Helmet } from "react-helmet";
import useUser from "../../hooks/useUser";
import "react-tabs/style/react-tabs.css";
import { FaEdit, FaEye } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";

const AllUser = () => {
  const [users, loading] = useUser();
  const [, , refetch] = useUsers();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400"></span>
      </div>
    );
  }

  const manageChangeRole = (user) => {
    Swal.fire({
      title: "Change Role",
      text: "Choose an option for the user role",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Make Admin",
      cancelButtonText: "Cancel",
      showDenyButton: true,
      denyButtonText: "Make Provider",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make Admin
        axiosSecure.patch(`user/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is now an Admin.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else if (result.isDenied) {
        // Redirect to the provider role change page
        navigate(`/changeRole/${user._id}`);
      } else {
        // Cancel clicked
        Swal.fire("No changes made", "", "info");
      }
    });
  };

  return (
    <div className="-mt-20">
      <Helmet>
        <title>All User</title>
      </Helmet>
      <SectionTitle heading={"All User"} subHeading={"Manage User"} />

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={user.photoUrl} alt="User Avatar" />
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-ghost btn-outline btn-success text-2xl">
                  <FaEye />
                </button>
              </td>
              <td>
                {user.role === "admin" ? (
                  <p>admin</p>
                ) : (
                  <button
                    className="btn btn-ghost btn-outline btn-warning text-2xl"
                    onClick={() => manageChangeRole(user)}
                  >
                    <FaEdit />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
