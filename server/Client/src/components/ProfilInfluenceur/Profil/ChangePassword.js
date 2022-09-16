import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, updateUser } from "../../../redux/actions/user.actions";
import { basicSchemaChangePasswordProfil } from "../../../schemas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//!-----------------------------------------------
function ChangePassword({ id }) {
  const dispatch = useDispatch();
  const { oneUserData } = useSelector((state) => state.user);

  const onSubmit = async (values, actions) => {
    if (id) {
      const { newPassword } = values;
      updateUser(id, newPassword, dispatch);
      values.newPassword = "";
      values.confirmPassword = "";
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: basicSchemaChangePasswordProfil,
    onSubmit,
  });

  useEffect(() => {
    getOneUser(id, dispatch);
  }, [id]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Change Password</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email">email: </label>
                  <input
                    name="email"
                    id="email"
                    type="text"
                    className="form-control"
                    disabled={true}
                    defaultValue={oneUserData?.email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>


                <div className="mb-3">
                  <label className="label-required"
                  htmlFor="newPassword">new password: </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      "form-control " +
                      (errors.newPassword && touched.newPassword
                        ? "border-danger"
                        : "")
                    }
                  />
                  {errors.newPassword && touched.newPassword && (
                    <p className="text-danger">{errors.newPassword}</p>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label label-required" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      "form-control " +
                      (errors.confirmPassword && touched.confirmPassword
                        ? "border-danger"
                        : "")
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-danger">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="mb-3">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
