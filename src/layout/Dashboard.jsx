import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarCheck,
  FaDollarSign,
  FaHome,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { BsEnvelopeExclamation } from "react-icons/bs";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Button for small screens */}
        <label htmlFor="my-drawer-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-yellow lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </label>
        {/* Main Content */}
        <div className="flex-grow p-10 overflow-y-auto h-screen">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProviders">
                  <IoMdPersonAdd /> Add Providers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProviders">
                  <MdOutlineMenuOpen /> Manage Providers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageReviews">
                  <BsEnvelopeExclamation /> Manage Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageAppointments">
                  <FaCalendarCheck /> Manage Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAppointment">
                  <FaCalendar /> My Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaDollarSign /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/Reviews">
                  <BsEnvelopeExclamation /> Reviews
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          {/* Shared Nav */}
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ourServices">
              <MdOutlineMenuOpen /> Our Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointment">
              <FaCalendar /> Appointment
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaPhone /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
