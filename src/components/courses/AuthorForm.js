import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

function AuthorForm({ author, onSave, onChange, saving = false, errors }) {
  return (
    <form onSubmit={onSave}>
      <h2>Add Author</h2>

      <TextInput
        name="name"
        label="name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="experience"
        label="experience"
        value={author.experience}
        onChange={onChange}
        error={errors.experience}
      />

      <button type="submit" className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default AuthorForm;
