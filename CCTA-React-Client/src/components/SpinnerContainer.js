import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'


class SpinnerContainer extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <>
        {/* {this.props.isBeingChanged &&
          <Spinner
            variant="warning"
            as="span"
            animation="grow"
            role="status"
            aria-hidden="true"
            className="spinners"
          />} */}
        {this.props.isLoading &&
          <div>
            <Spinner
              variant="warning"
              as="span"
              animation="grow"
              role="status"
              aria-hidden="true"
              className="spinners"
            /><Spinner
              variant="secondary"
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
              className="spinners"
            />
          </div>}
      </>
    );
  }
}

export default SpinnerContainer;