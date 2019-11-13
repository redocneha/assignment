import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as AuthorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { bindActionCreators } from "redux";
import AuthorList from "./AuthorList";
import Redirect from "react-router-dom";
import { newAuthor } from "../../../tools/mockData";
import Spinner from "./../common/Spinner";
class AuthorsPage extends React.Component {
  state = {
    flag: false,
    filteredList: [],
    author: newAuthor,
    errors: {
      name: "",
      experience: ""
    }
  };
  constructor() {
    super();
    this.handleChange1 = this.handleChange1.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadAuthors().catch(error => {
      alert(error);
    });
    this.setState({
      filteredList: this.props.authors
    });
  }

  handleDeleteAuthor = async author => {
    try {
      await this.props.actions.deleteAuthor(author);
    } catch (error) {
      console.log("error");
    }
  };
  handleFormValid() {
    console.log(this.state.author.name);

    if (this.state.author.name === "") {
      this.setState({
        errors: {
          name: "Author name needs to be valid"
        }
      });
      return false;
    }
    if (
      this.state.author.name.length <= 2 ||
      this.state.author.name.length > 15
    ) {
      this.setState({
        errors: {
          name: "Author name must be btween 2 and 15 characters length"
        }
      });
      return false;
    }
    if (
      this.state.author.experience < 0 ||
      this.state.author.experience > 100
    ) {
      this.setState({
        errors: {
          name: "Author experience must be btween 1 and 100 years"
        }
      });
      return false;
    }
    if (
      !this.state.author.experience.match(/^([0-9])/) ||
      this.state.author.experience.match(/^([a-z])/)
    ) {
      this.setState({
        errors: {
          experience: "Author experience must be a number"
        }
      });
      return false;
    }
    if (this.state.author.experience === "") {
      this.setState({
        errors: {
          experience: "Author experience needs to be valid"
        }
      });
      return false;
    }
    return true;
  }
  handleChange(event) {
    event.preventDefault();
    console.log(this.state.author);
    const { name, value } = event.target;
    console.log([name]);
    this.setState({
      author: { ...this.state.author, [name]: value }
    });
    console.log(this.state.author.name);
  }
  handleSave(event) {
    event.preventDefault();
    if (!this.handleFormValid()) return;
    console.log("hi" + this.state.author.name);

    this.props.actions
      .saveAuthor(this.state.author)
      .then(() => {
        console.log(this.state.errors);

        if (
          this.state.errors.name === "" &&
          this.state.errors.experience === ""
        ) {
          window.location.replace("http://localhost:3000/authors");
        }
      })
      .catch(error => {});
  }
  handleChange1(e) {
    let currentList = [];
    let filtered = [];
    if (e.target.value != null) {
      currentList = this.props.authors;
      filtered = currentList.filter(author => {
        const lc = author.name.toLowerCase();
        const elc = e.target.value.toLowerCase();
        return lc.includes(elc);
      });
    } else {
      filtered = this.props.authors;
    }
    this.setState({
      filteredList: filtered
    });
  }

  render() {
    return (
      <div>
        {this.state.flag ? (
          <AuthorForm
            author={this.state.author}
            onChange={this.handleChange.bind(this)}
            onSave={this.handleSave.bind(this)}
            errors={this.state.errors}
          />
        ) : (
          <>
            {console.log(this.props.loading)}
            {this.props.loading ? (
              <Spinner />
            ) : (
              <>
                {" "}
                <button
                  style={{ marginBottom: 40 }}
                  className="btn btn-primary addcourse"
                  onClick={() => this.setState({ flag: true })}
                >
                  Add Author
                </button>
                <h2>Authors </h2>
                <AuthorList
                  authors={this.props.authors}
                  onDeleteClick={this.handleDeleteAuthor}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const author = newAuthor;
  return {
    authors: state.authors,
    author,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthorActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
