import React from "react";
import Axios from "axios";
import Card from "./Card";

export default class TopStoriesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      topStoriesList: []
    };
  }
  temp = [];

  componentDidMount() {
    Axios.get("https://hacker-news.firebaseio.com/v0/topstories.json").then(
      response => {
        console.log(response);
        let i = 0;
        let promises = [];
        for (i = 0; i < response.data.length; i++) {
          promises.push(
            Axios.get(
              "https://hacker-news.firebaseio.com/v0/item/" +
                response.data[i] +
                ".json"
            ).then(res => {
              console.log(res.data);
              this.temp.push(res.data);
            })
          );
        }
        Axios.all(promises).then(
          this.setState({
            topStoriesList: this.temp
          })
        );
      }
      // console.log(this.state.topStoriesList);
    );
  }

  render() {
    console.log(this.state.topStoriesList);

    return (
      <>
        <h2>Top News Stories</h2>

        <div className="row">
          {this.state.topStoriesList.map((story, index) => (
            <div className="col-md-3" key={index}>
              <Card
                key={index}
                title={story.title}
                by={story.by}
                url={story.url}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}
