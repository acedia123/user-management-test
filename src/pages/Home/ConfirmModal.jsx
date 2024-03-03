import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Modal } from "antd";

const ConfirmModal = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const open = useCallback((info) => {
    setModalInfo(info);
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const onSubmit = useCallback(() => {
    modalInfo?.onSubmit();
    close();
  }, [close, modalInfo]);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  return (
    <Modal
      title={modalInfo?.title}
      open={visible}
      onOk={onSubmit}
      onCancel={close}
    >
      <span>Do you want to remove!</span>
    </Modal>
  );
});

export default memo(ConfirmModal);
