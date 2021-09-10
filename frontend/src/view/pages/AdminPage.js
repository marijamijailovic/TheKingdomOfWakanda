import React, {useState} from "react";
import { Nav } from "react-bootstrap";
import CandidateList from "../component/admin/CandidateList";
import AddDelegator from "../component/admin/AddDelegator";

const AdminPage = () => {
    const [showAddCandidates, setShowAddCandidates] = useState(true);
    const [showAddDelegators, setShowAddDelegators] = useState(false);

    const onSelectNavigationHandler = (selectedKey) =>{
        if(selectedKey === "add-candidates") {
            setShowAddDelegators(false);
            setShowAddCandidates(true);
        } else if(selectedKey === "add-delegators") {
            setShowAddCandidates(false);
            setShowAddDelegators(true);
        } 
    }

    return (
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Nav variant="tabs" defaultActiveKey="add-candidates" activeKey="/admin" onSelect={(selectedKey) => onSelectNavigationHandler(selectedKey)}>
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