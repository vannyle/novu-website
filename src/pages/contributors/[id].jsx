import { navigate } from '@reach/router';
import React, { useState } from 'react';

import Achievements from 'components/pages/contributor/achievements';
import Activity from 'components/pages/contributor/activity';
import Profile from 'components/pages/contributor/profile';
import GetStarted from 'components/shared/get-started';
import Layout from 'components/shared/layout';
import Separator from 'components/shared/separator';

import { axios } from '../../helpers/axios';

const SEO = (contributor) => ({
  title: `Novu - ${contributor.github || contributor.name}`,
  description: `Come and meet our awesome contributor ${contributor.github || contributor.name}`,
  slug: `contributor/${contributor.github}`,
  preventIndexing: false,
});

const ContributorPage = ({ serverData: { contributor } }) => {
  const [SEO_DETAILS] = useState(!contributor ? '' : SEO(contributor));
  if (!contributor) {
    navigate('/not-found');
    return <></>;
  }

  return (
    <Layout seo={SEO_DETAILS}>
      <div className="safe-paddings pt-44 md:pt-30 sm:pt-22">
        <div className="container-lg grid grid-cols-12 items-start gap-x-8 lg:gap-x-7 md:flex md:flex-col md:gap-x-0">
          <Profile contributor={contributor} />
          <div className="col-span-8">
            <Achievements contributor={contributor} />
            <Separator className="py-20 px-0 sm:py-16" backgroundColor="black" />
            <Activity contributor={contributor} />
          </div>
        </div>
      </div>
      <GetStarted />
      <Separator backgroundColor="black" />
    </Layout>
  );
};

export default ContributorPage;

export async function getServerData(context) {
  const contributor = await axios.get(`/contributor/${context.params.id}`);

  return {
    props: {
      contributor: contributor.data,
    },
  };
}
