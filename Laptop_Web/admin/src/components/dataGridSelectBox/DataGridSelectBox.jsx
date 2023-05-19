import 'react-circular-progressbar/dist/styles.css';
import Select from 'react-select';
import { useEffect, useState } from "react";
import updateRequest from '../../hooks/updateRequest';
import './dataGridSelectBox.scss';

export const DataGridSelectBox = ({ id, options, defaultStatus }) => {
    const [status, setStatus] = useState(defaultStatus);
    const handleChangeSinglePost = async (value, selectedId) => {
        if(selectedId === "status") {
            await setStatus(value);       
        }
    }
    useEffect(() => {
        updateRequest(`/admin/orders/${id}`, { status: status })
    }, [status])
  return (
    <>
    <div className='cellWithStatus'>
    <select id="status" className={options[status].label} onChange={(e) => handleChangeSinglePost(e.target.value, "status")}>
        {options.map((opt, index) => {
            if(defaultStatus === index) return <option value={opt.value} selected>{opt.label}</option>
            return <option value={opt.value}>{opt.label}</option>
        })}
    </select>
    </div>
    </>
    )
}
