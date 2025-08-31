import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import toast from "react-hot-toast";
import { editProfile, getUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username] = useState(user?.username || "");
  const [email] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  if (!user) return null;

  const handleSave = () => {
    if (!fullName.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }
    if (!currentPassword.trim()) {
      toast.error("Current password is required");
      return;
    }
    if ((newPassword && !repeatPassword) || (!newPassword && repeatPassword)) {
      toast.error(
        "Both new password fields must be filled if you want to change it"
      );
      return;
    }
    if (newPassword && repeatPassword && newPassword !== repeatPassword) {
      toast.error("New password and repeat password do not match");
      return;
    }

    const payload = { fullName, currentPassword, newPassword, repeatPassword };
    editProfile(payload)
      .then((res) => {
        getUser().then((res) => {
          setUser(res.data);
          setFullName(res.data.fullName);
        });

        // ✅ clear passwords
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");

        toast.success("Successfully edited profile");
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error updating profile");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <>
      <header
        className="py-5 text-white"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(56, 102, 65, 0.85),
              rgba(56, 102, 65, 0.85)
            ),
            url('https://source.unsplash.com/wfh8dDlNFOk/1600x900')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center my-4">
          <img
            className="img-fluid rounded-circle mb-3 shadow"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.fullName
            )}&background=386641&color=fff&size=150`}
            alt={user.fullName}
          />

          <div className="d-flex align-items-center justify-content-center">
            <h1 className="fs-2 fw-bold mb-0">{user.fullName}</h1>
            <FaPen
              role="button"
              onClick={() => setShowModal(true)}
              className="text-light ms-2"
              style={{ cursor: "pointer", fontSize: "0.9rem" }}
            />
          </div>

          <p className="text-white-50 mb-1">@{user.username}</p>
          <p className="text-white-50">{user.email}</p>

          {/* Logout Button */}
          <Button variant="outline-light" className="mt-4" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </header>

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} disabled />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} disabled />
            </Form.Group>

            {/* Current Password */}
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Only required if you wish to update your password
              </Form.Text>
            </Form.Group>

            {/* Repeat New Password */}
            <Form.Group className="mb-3">
              <Form.Label>Repeat New Password</Form.Label>
              <Form.Control
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Must match the new password (only if updating password)
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileHeader;
