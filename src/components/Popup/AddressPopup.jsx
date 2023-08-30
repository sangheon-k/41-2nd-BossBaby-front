import React, { useMemo, useState } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchKeyword } from '../../redux/slices/paymentSlice';
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
  const dispatch = useDispatch();
  const keyword = useSelector(state => state.payment.searchKeyword);
  const initialParams = { currentPage: 1, countPerPage: 20, keyword: keyword };

  const { data, remove, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['search-address'],
      queryFn: ({ pageParam = initialParams }) => searchAddress(pageParam),
      getNextPageParam: (lastPage, allPage) => {
        const { totalCount, currentPage, countPerPage } = lastPage.common;
        const totalPage = Math.ceil(totalCount / countPerPage);
        const newPageParam = {
          currentPage: parseInt(currentPage) + 1,
          countPerPage,
          keyword: keyword,
        };

        return parseInt(currentPage) < totalPage ? newPageParam : undefined;
      },
      refetchOnWindowFocus: false,
    });

  const addresses = useMemo(
    () => (data ? data.pages.flatMap(({ juso }) => juso) : []),
    [data]
  );

  const handleChangeKeyword = e => {
    dispatch(setSearchKeyword(e.target.value));
  };

  const handleSearchAddress = e => {
    remove();
    refetch();
  };

  const handleNextPage = () => {
    fetchNextPage();
  };

  return (
    <ReactModal isOpen onRequestClose={onClose} style={customStyles}>
      <ModalWrapper>
        <input
          type="text"
          value={keyword}
          onChange={handleChangeKeyword}
          onKeyDown={e => e.key === 'Enter' && handleSearchAddress(e)}
        />
        <button onClick={handleNextPage}>증가</button>
      </ModalWrapper>
    </ReactModal>
  );
};

export default AddressPopup;

export const searchAddress = async pageParam => {
  const { currentPage, countPerPage, keyword } = pageParam;
  const url = 'https://business.juso.go.kr/addrlink/addrLinkApi.do';
  const { data } = await axios.get(url, {
    params: {
      confmKey: process.env.REACT_APP_ADDRESS_API_KEY,
      resultType: 'json',
      currentPage: currentPage,
      countPerPage: 20,
      keyword: keyword,
    },
  });

  return data.results;
};

const ModalWrapper = styled.div`
  width: 400px;
  height: 300px;
`;
