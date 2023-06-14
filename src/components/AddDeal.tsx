import React, { FC, memo, useEffect, useState } from "react";
import { z } from "zod";
import { createDeal } from "../apis/deals.apis";
import { toast } from "react-hot-toast";
import { IDeal } from "../types/deals.types";

interface FormType {
  Name: string;
  Description: string;
  Status: string;
  Amount: number;
  Currency: string;
}
const base = {
  Name: "",
  Description: "",
  Status: "active",
  Amount: 0,
  Currency: "JD",
};

interface Props {
  setDeals: React.Dispatch<React.SetStateAction<IDeal[]>>;
}

const AddDeal: FC<Props> = memo(({ setDeals }) => {
  const [form, setForm] = useState<FormType>({ ...base });
  const [errors, setErrors] = useState<
    Omit<FormType, "Amount"> & { Amount: string }
  >({
    ...base,
    Status: "",
    Amount: "",
    Currency: "",
  });

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    Name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    Description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" }),
    Status: z.string().min(1, { message: "Please choose a status" }),
    Amount: z.number().min(1, { message: "Amount cannot be 0" }),
    Currency: z.string().min(1, { message: "Please choose a currency" }),
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name as keyof z.infer<typeof formSchema>)(
      name === "Amount" ? +value : value
    );
    setErrors({ ...errors, [name]: error });
    setForm((prev) => ({
      ...prev,
      [name]: name === "Amount" ? +value : value,
    }));
  };
  const handleSubmit = async () => {
    const parsed = formSchema.safeParse(form);
    if (parsed.success === false) {
      const error = parsed.error;
      let newErrors = {};
      for (const issue of error.issues) {
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        };
      }
      return setErrors(
        newErrors as Omit<FormType, "Amount"> & { Amount: string }
      );
    }

    setLoading(true);
    try {
      const res = await createDeal(form);
      if (!res.error) {
        toast.success("Deal created successfully");
        setLoading(false);
        window.deal_modal.close();
        setErrors({ ...base, Status: "", Amount: "", Currency: "" });
        setForm({ ...base });
        setDeals((prev) => [...prev, res]);
      } else {
        setLoading(false);
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.values(form).every((value) => value === "")) {
      setErrors({ ...base, Status: "", Amount: "", Currency: "" });
      return;
    }
  }, [form]);
  return (
    <>
      <button
        className="btn btn-primary self-end"
        onClick={() => window.deal_modal.showModal()}
      >
        Create Deal
      </button>
      <dialog id="deal_modal" className="modal">
        <div className="modal-box scrollbar-hide">
          <div className="form-control   w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="Name"
              type="text"
              placeholder="Deal Name"
              className="input input-bordered"
              onChange={handleChange}
              value={form.Name}
            />
            <label className=" label ">
              <span className="label-text-alt text-red-500">{errors.Name}</span>
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="Description"
              onChange={handleChange as any}
              value={form.Description}
              className="textarea textarea-bordered w-full"
              placeholder="This deal is amazing because..."
            ></textarea>
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.Description}
              </span>
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              name="Amount"
              min={0}
              type="number"
              placeholder="123"
              className="input input-bordered"
              onChange={handleChange}
              value={form.Amount}
            />
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors.Amount}
              </span>
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Currency</span>
            </label>
            <select
              name="Currency"
              onChange={(e) => handleChange(e as any)}
              value={form.Currency}
              className="select select-bordered"
            >
              <option disabled selected>
                choose a Currency
              </option>
              <option value={"JD"}>JD</option>
              <option value={"USD"}>USD</option>
              <option value={"EUR"}>EUR</option>
              <option value={"GBP"}>GBP</option>
            </select>
            <label className="label">
              <span className="label-text-alt text-red-500 ">
                {errors.Currency !== "JD" && errors.Currency}
              </span>
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              name="Status"
              onChange={(e) => handleChange(e as any)}
              value={form.Status}
              className="select select-bordered"
            >
              <option disabled selected>
                choose a status
              </option>
              <option value={"Active"}>Active</option>
              <option value={"Inactive"}>Inactive</option>
              <option value={"Deleted"}>Deleted</option>
              <option value={"Expired"}>Expired</option>
            </select>
            <label className="label">
              <span className="label-text-alt text-red-500 ">
                {errors.Status}
              </span>
            </label>
          </div>

          <div className="form-control mt-6 w-full items-end">
            <button
              className="btn btn-primary w-7/12"
              disabled={
                !Object.values(form).every((value) => value !== "") || loading
              }
              onClick={() => {
                handleSubmit();
              }}
            >
              {loading ? <div className="loading"></div> : "Add Deal"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default AddDeal;
