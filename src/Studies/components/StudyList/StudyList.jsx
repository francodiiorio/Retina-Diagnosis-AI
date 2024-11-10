import React, {useState} from "react";
import styles from './StudyList.module.css'; 
import StudyItem from "../StudyItem/StudyItem";
import Card from "../../../shared/components/UIElements/Card";

const StudyList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
        <ul className={styles.studiesList}>
            {props.items.map(user => {
                return <StudyItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places} />;
            })}
        </ul>
        </React.Fragment>
    )
};

export default StudyList;