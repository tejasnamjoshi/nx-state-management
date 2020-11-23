import './Repositories.scss';

import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { fetchUserRepositories, paginationDataAtom, repositorySortParamAtom, repositoryStateAtom } from 'src/atoms/userStateAtoms';
import { getNextUrl } from 'src/code/helpers';
import InputSelect from 'src/components/common/InputSelect';

import RepositoryDetails from '../RepositoryDetails/RepositoryDetails';

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
  const setPaginationData = useSetRecoilState(paginationDataAtom);
  const resetPaginationData = useResetRecoilState(paginationDataAtom);
  const [repositories, setRepositories] = useRecoilState(repositoryStateAtom);
  const resetRepositoryData = useResetRecoilState(repositoryStateAtom);
  const setSortParam = useSetRecoilState(repositorySortParamAtom);
  const repositoryResponse = useRecoilValue(fetchUserRepositories);
  const nextUrl = repositoryResponse ? getNextUrl(repositoryResponse) : null;

  const cleanup = useCallback(() => {
    resetRepositoryData();
    resetPaginationData();
  }, [resetRepositoryData, resetPaginationData]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    // * Persist data to the atom
    if (repositoryResponse) setRepositories(current => current.concat(repositoryResponse.data));
  }, [repositoryResponse, setRepositories]);

  const handleOnSelect = (value: string) => {
    setSortParam(value);
    cleanup();
  };

  const handleLoadMore = () => {
    setPaginationData({ nextUrl });
  };

  return (
    <div className="Repositories">
      <h1>Repositories</h1>
      <InputSelect options={SORT_OPTIONS} onSelect={handleOnSelect} />
      <div className="Repositories__list mt-4">
        <InfiniteScroll
          hasMore={!!nextUrl}
          dataLength={repositories.length}
          next={handleLoadMore}
          loader={
            <p className="text-center">
              <b>Loading...</b>
            </p>
          }
          endMessage={
            <p className="text-center">
              <b>Nothing more to show</b>
            </p>
          }
        >
          {repositories.map((repository, index) => {
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
