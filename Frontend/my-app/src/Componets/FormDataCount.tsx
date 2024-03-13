// FormDataCount.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { getFormDataCount } from '../Redux/Action';
import Navbar from './Navbar';
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import FormList from './FormList';
const FormDataCount: React.FC = () => {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.form.count);

    useEffect(() => {
        //@ts-ignore
        dispatch(getFormDataCount());
    }, [dispatch]);

    return (
        <div>
            <Navbar />

            <div className='resdiv'>
                <h2 className='count'> {count} responses </h2>
                <div className='tra'>
                    <div className='innerdiv'>
                        <div className='linkdiv'>
                            <FaExternalLinkSquareAlt className='icon2' />
                            <a href="" className='abc'>link to sheets</a>
                        </div>
                        <div className='icon1'><BsThreeDotsVertical /></div>
                    </div>
                    <div className='checkslide'>
                        <p className='accept'>Accepting responses</p>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"    />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

            </div>
            <div>

            </div>
            <FormList/>
        </div>

    );
};

export default FormDataCount;
