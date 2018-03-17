import React from "react";

export default class Control extends React.Component {
  constructor () {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      government: "",
      agency: "",
      title: "",
      sortby: "wage",
      direction: "desc"
    };
  }

  onChange (e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit (e) {
    var filters = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      government: this.state.government,
      agency: this.state.agency,
      title: this.state.title,
      sortby: this.state.sortby,
      direction: this.state.direction
    };
    Object.keys(filters).forEach(function (key) {
      if (filters[key] === "") {
        delete filters[key];
      }
    });
    this.props.handleSubmit(filters);
  }

  handleClear (e) {
    this.setState({
      first_name: "",
      last_name: "",
      government: "",
      agency: "",
      title: "",
      sortby: "wage",
      direction: "desc"
    }, this.handleSubmit);
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }


  render () {
    var plotDisable = "disable";
    var plotHelpText = "Add additional search terms to enable plotting";
    if (this.props.allowPlot) {
      plotDisable = "";
      plotHelpText = "";
    }
    return (
      <form className="form-horizontal" onKeyPress={this.handleKeyPress.bind(this)} method="get">
        <div className="form-group">
          <div className="col-sm-4">
            <label htmlFor="first_name">First name:</label>
            <input type="text" className="form-control" id="first_name" name="first_name"
                onChange={this.onChange.bind(this)} value={this.state.first_name}/>
          </div>
          <div className="col-sm-4">
            <label htmlFor="last_name">Last name:</label>
            <input type="text" className="form-control" id="last_name" name="last_name"
                onChange={this.onChange.bind(this)} value={this.state.last_name}/>
          </div>
          <div className="col-sm-4">
            <label htmlFor="title">Title:</label>
            <input type="text" className="form-control" id="title" name="title"
                onChange={this.onChange.bind(this)} value={this.state.title}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-4">
            <label htmlFor="government">Government:</label>
            <input type="text" className="form-control" id="government" name="government"
                onChange={this.onChange.bind(this)} value={this.state.government}/>
          </div>
          <div className="col-sm-4">
            <label htmlFor="agency">Agency:</label>
            <input type="text" className="form-control" id="agency" name="agency"
                onChange={this.onChange.bind(this)} value={this.state.agency}/>
          </div>
          <div className="col-xs-6 col-sm-2">
            <label htmlFor="sortby">Order by:</label>
            <select className="form-control" id="sortby" value={this.state.sortby} onChange={this.onChange.bind(this)}>
              <option value="first_name">First name</option>
              <option value="last_name">Last name</option>
              <option value="government">Government</option>
              <option value="dept">Dept</option>
              <option value="title">Title</option>
              <option value="wage">Wage</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="col-xs-6 col-sm-2">
            <label htmlFor="direction">Direction:</label>
            <select className="form-control" id="direction"
                value={this.state.direction} onChange={this.onChange.bind(this)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6 col-sm-4 button-wrapper">
            <button type="button" className="btn btn-primary btn-lg btn-block"
                onClick={this.handleSubmit.bind(this)}>Search</button>
          </div>
          <div className="col-xs-6 col-sm-2 col-sm-offset-6">
            <button type="button" className="btn btn-warning btn-lg btn-block"
                onClick={this.handleClear.bind(this)}>Clear</button>
          </div>
        </div>
      </form>
    );
  }
}

Control.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  showPlot: React.PropTypes.func.isRequired,
  allowPlot: React.PropTypes.bool.isRequired
};
