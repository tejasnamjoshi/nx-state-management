import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'src/store/reducers/errorsReducer';
import { IReduxState } from 'src/store/reducers/initialState';

const Error = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((s: IReduxState) => s.error.message);

  const dismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dismissError();
    }, 10000);
  }, [dismissError]);

  if (!errorMessage) return null;

  return (
    <div className="Error d-flex justify-content-center mt-4">
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <p className="m-0">{errorMessage}</p>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={dismissError}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Error;
