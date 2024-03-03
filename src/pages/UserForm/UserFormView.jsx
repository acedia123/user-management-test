import { Button, FloatButton, Input } from "antd";
import { memo, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addNewUser, editUserForm } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formControllers = {
  firstName: {
    label: "First Name",
    required: "This is required",
    placeholder: "Enter first name",
  },
  lastName: {
    label: "Last Name",
    required: "This is required",
    placeholder: "Enter last name",
  },
  age: {
    label: "Age",
    required: "This is required",
    placeholder: "Enter your age",
    type: "number",
  },
};

const UserFormView = ({ id, defaultValues }) => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues,
  });
  const [shouldEditForm, setShouldEditForm] = useState(!id);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);

  const onSubmit = useCallback(
    (data) => {
      // Validate form
      // If errors have value => ignore this function
      // If errors empty => call api submit form
      // Check id from params to know which api should use to add or update
      setSubmitFormLoading(true);
      if (id) {
        // Update user information
        /*
            - If api submit form fail => show error toast
            - If api submit form success => show success toast
        */
        editUserForm(id, data)
          .then(() => {
            toast.success("Updated User Successfully");
            setShouldEditForm(false);
          })
          .catch(() => {
            toast.error("Remove User Failure");
          })
          .finally(() => {
            setSubmitFormLoading(false);
          });
      } else {
        // Add new user
        /*
            - If api submit form fail => show error toast
            - If api submit form success => show success toast and redirect to user manage page
        */
        addNewUser(data)
          .then(() => {
            toast.success("Add New User Successfully");
            navigate("/");
          })
          .catch(() => {
            toast.error("Remove User Failure");
          })
          .finally(() => {
            setSubmitFormLoading(false);
          });
      }
    },
    [id, navigate]
  );

  const handleEnabledEdit = () => {
    // Toggle form between view detail form or edit form
    setShouldEditForm((pre) => !pre);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {id && (
        <FloatButton
          icon={<>+</>}
          tooltip={<>Add New User</>}
          onClick={() => {
            navigate("/add-user");
          }}
        />
      )}
      <h1 className="home__header">
        {id ? "User Detail" : "Add New User Form"}
      </h1>
      <div className="user-form__form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="user-form__form">
          {Object.keys(formControllers).map((item) => {
            const { label, type, required, placeholder } =
              formControllers[item] ?? {};
            return (
              <Controller
                key={item}
                control={control}
                name={item}
                rules={{
                  required,
                }}
                render={({
                  field: { value, onChange, name, defaultValue },
                  formState,
                }) => (
                  <div className="user-form__form-input">
                    <label>{label}</label>
                    <Input
                      name={name}
                      type={type ?? "text"}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      value={value}
                      onChange={onChange}
                      error={formState.errors?.[item]?.message}
                      disabled={!shouldEditForm}
                    />
                    {formState.errors?.[item] && (
                      <span className="text-error">
                        {formState.errors?.[item]?.message}
                      </span>
                    )}
                  </div>
                )}
              />
            );
          })}

          <div className="user-form__actions">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitFormLoading}
            >
              Submit
            </Button>
            {id && (
              <Button
                type="default"
                htmlType="button"
                onClick={handleEnabledEdit}
              >
                {shouldEditForm ? "Cancel Edit" : "Edit Form"}
              </Button>
            )}

            <Button type="link" htmlType="button" onClick={handleBack}>
              Back
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(UserFormView);
