import React, { useState } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddressPopup = ({ onClose }) => {
  const [params, setParams] = useState({
    currentPage: 1,
    countPerPage: 10,
    keyword: '분당구',
  });

  return (
    <ReactModal isOpen onRequestClose={onClose} style={customStyles}>
      AddressPopup
    </ReactModal>
  );
};

export default AddressPopup;

export const searchAddress = async params => {
  const url = 'https://business.juso.go.kr/addrlink/addrLinkApi.do';
  return await axios.get(url, {
    params: {
      confmKey: process.env.REACT_APP_ADDRESS_API_KEY,
      resultType: 'json',
      ...params,
    },
  });
};
