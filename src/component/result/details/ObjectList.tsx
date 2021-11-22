import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { IObjectDetected } from '../../../app/models/Result';
import { mouseOnHandler, mouseLeaveHandler } from '../../../app/redux/action';
import "./ObjectList.scss";

interface IProps {
    response: Map<string, IObjectDetected>;
    mouseOnHandler(id:string, parent: string): Promise<void>;
    mouseLeaveHandler(id:string, parent: string): Promise<void>;
}
const ObjectList:React.FC<IProps> = ({response, mouseOnHandler, mouseLeaveHandler}) => {
    return (
        <div className="object-list-wrapper">
            {Array.from(response.entries()).map((entry) => {
            const [key, value] = entry
            return value.detected.map((dt) => {
                return (<Fragment key={dt.id}>
                {value.selected ? (
                  <div 
                  className="object-item"
                  onMouseEnter={() => mouseOnHandler(dt.id,dt.parent)}
                  onMouseLeave={() => mouseLeaveHandler(dt.id,dt.parent)}
                  >
                    <div className="item-label">
                      <p>{dt.name}</p>
                      <p>{`${dt.confidence}%`}</p>
                    </div>
                    <div className="confidence">
                      <div
                        className="progress"
                        style={{
                          width: `${dt.confidence}%`,
                          background: value.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ) : null}
              </Fragment>)
            
            })})}
        </div>
    )
}

export default connect(null, {mouseOnHandler, mouseLeaveHandler})(ObjectList)
