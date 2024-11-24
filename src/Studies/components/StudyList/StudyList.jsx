import React, {useState} from "react";
import styles from './StudyList.module.css'; 
import StudyItem from "../StudyItem/StudyItem";
import Card from "../../../shared/components/UIElements/Card";

const StudyList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No se encontraron estudios</h2>
                </Card>
            </div>
        );
    }

    return (

        <React.Fragment>
        <ul className={styles.studiesList}>
            {props.items.map(item => {
                return <StudyItem
                    key={item.horario}
                    image={item.path}
                    name={item.horario}
                    fecha={item.fecha} />;
            })}
        </ul>
        </React.Fragment>
    )
};

export default StudyList;