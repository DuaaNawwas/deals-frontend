import React, { FC, memo, useEffect, useState } from "react";
import { z } from "zod";
import { registerUser } from "../apis/user.apis";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface FormType {
  Name: string;
  Email: string;
  Password: string;
  Confirm_Password: string;
  Phone: string;
  Gender: "Male" | "Female" | string;
  Date_Of_Birth: string;
}
const base = {
  Name: "",
  Email: "",
  Password: "",
  Phone: "",
  Gender: "",
  Date_Of_Birth: "",
  Confirm_Password: "",
};
const Register: FC = memo(() => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormType>({ ...base });
  const [errors, setErrors] = useState<FormType>({ ...base });

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    Name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    Email: z.string().email({ message: "Invalid email" }),
    Password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    Confirm_Password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    Phone: z
      .string()
      .startsWith("07")
      .min(10, { message: "Phone must be at least 10 characters long" })
      .max(10, { message: "Phone must be at most 10 characters long" })
      .regex(/^[0-9]+$/, { message: "Phone must be a number" }),
    Gender: z.string().min(1, { message: "Select a gender" }),
    Date_Of_Birth: z.string().min(1, { message: "Select Date" }),
  });
  const validateField =
    (field: keyof z.infer<typeof formSchema>) =>
    (value: unknown): string => {
      const parsedResult = formSchema
        .pick({
          [field]: true,
        })
        .safeParse({
          [field]: value,
        });
      return parsedResult.success === false
        ? parsedResult.error.errors[0].message
        : "";
    };

  const refinedFormSchema = formSchema.refine(
    (data: any) => data.Password === data.Confirm_Password,
    {
      message: "Passwords do not match",
      path: ["Confirm_Password"],
    }
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name as keyof z.infer<typeof formSchema>)(
      value
    );
    setErrors({ ...errors, [name]: error });
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const parsed = refinedFormSchema.safeParse(form);
    if (parsed.success === false) {
      const error = parsed.error;
      let newErrors = {};
      for (const issue of error.issues) {
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        };
      }
      return setErrors(newErrors as FormType);
    }
    setErrors({ ...base });

    try {
      const res = await registerUser(form);
      if (!res.error) {
        toast.success("Registered Successfully, Please Login");
        navigate("/");
      } else {
        setLoading(false);
        toast.error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (Object.values(form).every((value) => value === "")) {
      setErrors({
        Name: "",
        Email: "",
        Password: "",
        Phone: "",
        Gender: "",
        Date_Of_Birth: "",
        Confirm_Password: "",
      });
      return;
    }
  }, [form]);
  return (
    <>
      <div className="flex flex-col justify-center gap-10 items-center p-10 h-full">
        <div className="card mx-auto  shadow-2xl bg-base-300">
          <div className=" p-8 flex flex-wrap  gap-2  justify-between ">
            <div className="w-full">
              <div className="form-control   ">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="Name"
                  type="text"
                  placeholder="Michael Scott"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={form.Name}
                />
                <label className=" label ">
                  <span className="label-text-alt text-red-500">
                    {errors.Name}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="Email"
                  type="email"
                  placeholder="michael@dundermifflin.com"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={form.Email}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    {errors.Email}
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="Password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={form.Password}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    {errors.Password}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confim Password</span>
                </label>
                <input
                  name="Confirm_Password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={handleChange}
                  value={form.Confirm_Password}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    {form.Confirm_Password !== form.Password
                      ? "Passwords don't match"
                      : errors.Confirm_Password}
                  </span>
                </label>
              </div>
            </div>

            <div className="form-control flex-auto">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                name="Phone"
                type="tel"
                placeholder="07 7808 6357"
                className="input input-bordered"
                onChange={handleChange}
                value={form.Phone}
              />
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.Phone}
                </span>
              </label>
            </div>
            <div className="form-control flex-auto">
              <label className="label">
                <span className="label-text">Date Of Birth</span>
              </label>
              <input
                name="Date_Of_Birth"
                type="date"
                placeholder="(570) 343-3400"
                className="input input-bordered"
                onChange={handleChange}
                value={form.Date_Of_Birth}
              />
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.Date_Of_Birth}
                </span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="Gender"
                onChange={(e) => handleChange(e as any)}
                value={form.Gender}
                className="select select-bordered"
              >
                <option value={""} disabled selected>
                  Gender
                </option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
              <label className="label">
                <span className="label-text-alt text-red-500 ">
                  {errors.Gender}
                </span>
              </label>
            </div>

            <div className="form-control mt-6 w-full">
              <button
                className="btn btn-primary w-full "
                disabled={
                  !Object.values(form).every((value) => value !== "") || loading
                }
                onClick={handleSubmit}
              >
                {loading ? <div className="loading"></div> : "Sign up"}
              </button>
              <label className=" flex gap-1">
                <span className="label-text-alt">Already have an account?</span>
                <Link to={"/"} className="label-text-alt link link-hover">
                  Login
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Register;
