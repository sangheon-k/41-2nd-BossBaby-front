import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AddressPopup from '../../../../components/Popup/AddressPopup';
import { setPopups } from '../../../../redux/slices/commonSlice';
import Title from '../Common/Title';

const Address = ({ payInfo, setPayInfo }) => {
  const dispatch = useDispatch();
  const popup = useSelector(state => state.common.popup);

  const handleChangeInput = e => {
    const newPayInfo = { ...payInfo };
    newPayInfo.address = e.target.value;
    setPayInfo(newPayInfo);
  };

  const handleSearch = () => {
    dispatch(setPopups('address'));
  };

  return (
    <AddressInfo>
      <Title title="배송지" />
      <InputWrap>
        <InputText
          value={payInfo.address}
          placeholder="배송지를 입력해주세요."
          onChange={handleChangeInput}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <InputText
          bgColor="#f6f6f6"
          placeholder="배송 요청사항을 입력해주세요."
        />
      </InputWrap>

      {/* 주소검색 팝업 */}
      {popup === 'address' && <AddressPopup />}
    </AddressInfo>
  );
};

const AddressInfo = styled.div`
  padding-top: 60px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const InputText = styled.input.attrs(props => ({
  type: 'text',
  value: props.value,
  onChange: props.onChange,
}))`
  width: 100%;
  padding: 19px 21px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  border-radius: 5px;
  border: 1px solid ${props => props.bgColor || '#d9d9d9'};
  background-color: ${props => props.bgColor || '#fff'};
  outline: none;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border: 1px solid ${props => props.bgColor || '#999'};
  }
`;

export default Address;
