import React from 'react';
import Tooltip from 'react-tooltip';

const Camp = (props) => {
  const { camp } = props;

  const renderTickMark = () => {
    const tickChance = Math.random();
    if (tickChance < 0.7 && camp.responses >= 3 || camp.responses >= 50) {
      return (
        <span>
          <span className="verified-status-tick fa fa-check tool-tip" data-tip data-for="tool-tip-text" />
          <Tooltip id="tool-tip-text" place="bottom">
            <span>This listing's accuracy has been verified by a <strong>Timcamp Photographer</strong> who has visited and photographed the property.</span>
          </Tooltip>
        </span>
      );
    };
  };

  return (
    <div className="suggested-camp">
      <div className="background" style={{ backgroundImage: `url(${camp.image_url})` }} />
      <h4>
        <span className="suggested-camp_name">{camp.name}</span>
        {renderTickMark()}
      </h4>
      <small className="suggested-camp_property">
        <a target="_blank" className="underlined">{camp.property}</a>
      </small>
      <div className="recommend">
        <a>
          <span className="fa fa-thumbs-up" />
          <strong>
            <span className="percentage">{camp.rating}% </span>
            Recommend
          </strong> - {camp.responses} Responses
        </a>
      </div>
    </div>
  );
};

export default Camp;
