import { Button, Space, Table, Tooltip } from "antd";
import React, { memo, useCallback, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getListUsers, removeUser } from "../../services";
import { useFetchData } from "../../hooks";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const confirmModalRef = useRef();
  const { data, isLoading, refetch } = useFetchData(getListUsers());

  const handleRemoveItem = useCallback(
    (id) => {
      // Remove Item
      /* 
        - Open confirm modal
        - If user select cancel => close modal
        - if user select Ok => Call remove api
        - If api success => show success toast
        - If api fail => show error toast
      */
      confirmModalRef?.current.open({
        title: "Remove Confirm",
        onSubmit: () => {
          removeUser(id)
            .then(() => {
              refetch();
              toast.success("Removed User Successfully");
            })
            .catch(() => {
              toast.error("Remove User Failure");
            });
        },
      });
    },
    [refetch]
  );

  const defineColumn = [
    {
      title: "Full Name",
      key: "name",
      render: (_, record) => (
        <span>{record.firstName + " " + record.lastName}</span>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/${record.id}`}>View Detail</Link>
          <Button type="link" onClick={handleRemoveItem.bind(this, record.id)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const onAddNewUser = () => {
    // Redirect user to add new form
    navigate("/add-user");
  };

  const dataReverse = useMemo(() => {
    // Api doesn't support sort by so this functions to get data sort from last to first
    const reverseArray = data?.slice();
    return reverseArray?.reverse();
  }, [data]);

  return (
    <div className="home-page">
      <h1 className="home__header">User Management</h1>
      {/* 
        ----- Filter Section ------
        - Contain 3 component is Area Selection, Region Selection, City Selection
        1. Load data into the selections above
        2. Interaction between the selections
        - Area Selection
        - Region Selection
          + Select a value => Update value in to url => Call api to filter list users by region value
          + Select default value or All region => Remove value in url => Call api with empty region value
        - City Selection
          + Select a value => Update value in to url => Call api to filter list users by city value
          + Select default value or All city => Remove value in url => Call api with empty city value 
        - Note: Combine all the above conditions to filter data
      */}
      <div className="search-bar__section">Search Bar Section</div>

      <div className="floating-icon">
        <Tooltip title="Add New User" placement="left">
          <Button onClick={onAddNewUser} className="floating-icon__button">
            +
          </Button>
        </Tooltip>
      </div>

      <Table
        rowKey="id"
        dataSource={dataReverse}
        columns={defineColumn}
        loading={isLoading}
      />
      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
};

export default memo(HomePage);
