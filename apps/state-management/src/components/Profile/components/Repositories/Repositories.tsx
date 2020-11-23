import './Repositories.scss';

import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import InputSelect from 'src/components/common/InputSelect';
import { IReduxState } from 'src/store/reducers/initialState';
import { clearPaginationData, clearRepositoryData, fetchUserRepositories, IRepository } from 'src/store/reducers/userReducer';

import RepositoryDetails from '../RepositoryDetails/RepositoryDetails';
import { IParams } from '../../Profile';

const SORT_OPTIONS = [
  {
    label: 'Pushed',
    value: 'pushed'
  },
  {
    label: 'Created',
    value: 'created'
  },
  {
    label: 'Updated',
    value: 'updated'
  },
  {
    label: 'Full Name',
    value: 'full_name'
  }
];

const Repositories = () => {
  const repositories = useSelector((s: IReduxState) => s.user.repositoriesData);
  const hasMore = useSelector((s: IReduxState) => s.user.pagination.hasMore);
  const dispatch = useDispatch();
  const { username } = useParams<IParams>();

  const fetchRepositories = useCallback(
    (sortParam: string = 'pushed') => {
      dispatch(fetchUserRepositories({ username, sortParam }));
    },
    [username, dispatch]
  );

  const cleanup = useCallback(() => {
    dispatch(clearPaginationData());
    dispatch(clearRepositoryData());
  }, [dispatch]);

  useEffect(() => {
    fetchRepositories();
    return cleanup;
  }, [fetchRepositories, cleanup]);

  const handleOnSelect = (value: string) => {
    dispatch(clearPaginationData());
    dispatch(clearRepositoryData());
    fetchRepositories(value);
  };

  return (
    <div className="Repositories">
      <h1>Repositories</h1>
      <InputSelect options={SORT_OPTIONS} onSelect={handleOnSelect} />
      <div className="Repositories__list mt-4">
        <InfiniteScroll
          hasMore={hasMore}
          dataLength={repositories.length}
          next={fetchRepositories}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-center">
              <b>Nothing more to show</b>
            </p>
          }
        >
          {repositories.map((repository: IRepository, index) => {
            const { language, description } = repository;
            return (
              <div className="Repositories__item py-4" key={index}>
                <a href={repository.html_url} target="blank">
                  {repository.name}
                </a>
                {description && <p>{description}</p>}

                <div className="d-flex Repositories__details">
                  {language && (
                    <RepositoryDetails
                      className="Repositories__language"
                      icon={`Repositories__languageIcon--${language.toLowerCase()} fas fa-circle`}
                      text={language}
                    />
                  )}

                  <RepositoryDetails icon="fas fa-star" text={repository.stargazers_count} />

                  <RepositoryDetails icon="fa fa-code-fork" text={repository.forks_count} />
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Repositories;
