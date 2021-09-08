import React, {useState} from "react";
import { Nav } from "react-bootstrap";
import CandidateList from "../component/CandidateList";
import AddDelegator from "../component/AddDelegator";

const AdminPage = () => {
    const [showAddCandidates, setShowAddCandidates] = useState(false);
    const [showAddDelegators, setShowAddDelegators] = useState(false);

    const onSelectNavigationHandler = (selectedKey) =>{
        if(selectedKey === "add-candidates") {
            setShowAddDelegators(false);
            setShowAddCandidates(true);
        } else if(selectedKey === "add-delegators") {
            setShowAddCandidates(false);
            setShowAddDelegators(true);
        } else {
            setShowAddCandidates(false);
            setShowAddDelegators(false);
        }
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Nav activeKey="/admin" onSelect={(selectedKey) => onSelectNavigationHandler(selectedKey)}>
                <Nav.Item>
                    <Nav.Link eventKey="add-candidates">Add Candidates</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="add-delegators">Add Delegators</Nav.Link>
                </Nav.Item>
            </Nav>
            {showAddCandidates && <CandidateList />}
            {showAddDelegators && <AddDelegator />}
        </div>
    );
};

export default AdminPage;