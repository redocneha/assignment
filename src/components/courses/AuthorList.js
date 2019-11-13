import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Redirect from "react-router-dom";
import AuthorForm from "./AuthorForm";
import { connect } from "react-redux";
import { loadAuthors } from "./../../redux/actions/authorActions";
function AuthorList({ authors, onDeleteClick, onSaveClick }) {
  const [filteredList, setFilteredList] = useState([
    { id: "", name: "", experience: "" }
  ]);
  useEffect(() => {
    console.log(authors.length);
    console.log(filteredList);
  }, []);
  function handleChange(e) {
    debugger;
    console.log(filteredList);
    let currentList = [];
    let filtered = [];
    if (e.target.value != null) {
      debugger;
      currentList = authors;

      filtered = currentList.filter(author => {
        const lc = author.name.toLowerCase();
        const elc = e.target.value.toLowerCase();

        return lc.includes(elc);
      });
    } else {
      filtered = authors;
    }
    console.log(filtered);
    console.log(filteredList);
    setFilteredList([...filteredList, filtered]);
    console.log("hi" + filteredList);
  }
  return (
    <div>
      {authors.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>AuthorID</th>
                <th>AuthorName</th>
                <th>Author Experience</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {authors.map(author => {
                return (
                  <tr key={author.id}>
                    <td>{author.id}</td>
                    <td>{author.name}</td>
                    <td>{author.experience}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDeleteClick(author)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        "No Authors found"
      )}
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorList);
