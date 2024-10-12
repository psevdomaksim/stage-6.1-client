import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";
import "../App.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Max length is 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(5000, "Max length is 5000 characters"),
  author: yup.string().required("Author is required"),
  tags: yup.string().notRequired(),
  category: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),

  atLeastOneTextInput: yup
    .mixed()
    .test(
      "at-least-one",
      "At least one text input must have a max length validation",
      function () {
        const { title, description } = this.parent;
        return title.length <= 100 || description.length <= 5000;
      }
    ),

  additionalText: yup.string().when("showAdditionalFields", {
    is: "yes",
    then: () => yup.string().required("This field is required"),
    otherwise: () => yup.string().notRequired(),
  }),
  additionalSelect: yup.string().when("showAdditionalFields", {
    is: "yes",
    then: () => yup.string().required("This field is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  showAdditionalFields: yup.string().notRequired(),

  tasks: yup.array().of(
    yup.object().shape({
      taskName: yup.string().required("Task name is required"),
      taskStatus: yup.string().required("Task status is required"),
    })
  ),
});

PostForm.propTypes = {
  defaultValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        taskName: PropTypes.string,
        taskStatus: PropTypes.string,
      })
    ),
    additionalText: PropTypes.string,
    additionalSelect: PropTypes.string,
    showAdditionalFields: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default function PostForm({ defaultValues = {}, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(
    defaultValues.showAdditionalFields === "yes"
  );

  useEffect(() => {
    reset(defaultValues);
    setShowAdditionalFields(defaultValues.showAdditionalFields === "yes");
  }, [defaultValues, reset]);

  const handleRadioChange = (event) => {
    setShowAdditionalFields(event.target.value === "yes");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmitFiltered = (data) => {
    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (data[key] || (Array.isArray(data[key]) && data[key].length > 0)) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    onSubmit(filteredData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFiltered)} className="form-container">
      <div className="form-group">
        <label>Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Author</label>
        <Controller
          name="author"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.author && (
          <p className="error-message">{errors.author.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Tags (Optional)</label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="">Select category</option>
              <option value="tech">Tech</option>
              <option value="health">Health</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          )}
        />
        {errors.category && (
          <p className="error-message">{errors.category.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="">Select status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          )}
        />
        {errors.status && (
          <p className="error-message">{errors.status.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Do you want to add more fields?</label>
        <div>
          <label>
            <input
              type="radio"
              value="yes"
              checked={showAdditionalFields === true}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={showAdditionalFields === false}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>
      </div>

      {showAdditionalFields && (
        <>
          <div className="form-group">
            <label>Additional Select</label>
            <Controller
              name="additionalSelect"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              )}
            />
            {errors.additionalSelect && (
              <p className="error-message">{errors.additionalSelect.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Additional Text Field</label>
            <Controller
              name="additionalText"
              control={control}
              render={({ field }) => <input {...field} />}
            />
            {errors.additionalText && (
              <p className="error-message">{errors.additionalText.message}</p>
            )}
          </div>
        </>
      )}

      <h3 className="task-header">Tasks</h3>
      {fields.map((task, index) => (
        <div key={task.id} className="task-group">
          <div className="form-group">
            <label>Task Name</label>
            <Controller
              name={`tasks[${index}].taskName`}
              control={control}
              render={({ field }) => <input {...field} />}
            />
            {errors.tasks &&
              errors.tasks[index] &&
              errors.tasks[index].taskName && (
                <p className="error-message">
                  {errors.tasks[index].taskName.message}
                </p>
              )}
          </div>

          <div className="form-group">
            <label>Task Status</label>
            <Controller
              name={`tasks[${index}].taskStatus`}
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select task status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              )}
            />
            {errors.tasks &&
              errors.tasks[index] &&
              errors.tasks[index].taskStatus && (
                <p className="error-message">
                  {errors.tasks[index].taskStatus.message}
                </p>
              )}
          </div>

          <button
            className="remove-task-btn"
            type="button"
            onClick={() => remove(index)}
          >
            Remove Task
          </button>
        </div>
      ))}

      <button
        className="add-task-btn"
        type="button"
        onClick={() => append({ taskName: "", taskStatus: "" })}
      >
        Add Task
      </button>

      <button className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
