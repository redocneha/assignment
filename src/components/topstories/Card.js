import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    //this.details = this.details.bind(this);
  }

  //details(){
  //    console.log('Came inside the click event handler');
  //}
  render() {
    return (
      <div className="card" style={{ width: 18 + "rem" }}>
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <h5 className="card-title">By : {this.props.by}</h5>
          <p className="card-text">
            <a href={this.props.url}>Click to see the full article</a>
          </p>

          {/* <button href="#" className="btn btn-primary" onClick={()=>this.props.selected(this.props)}>Go somewhere</button> */}
        </div>
      </div>
    );
  }
}
