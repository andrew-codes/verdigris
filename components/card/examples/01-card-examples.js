import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '../src/index';

export default () => (
  <div>
    <Card hasShadow={false}>
      <CardHeader>
        Header
      </CardHeader>
      <CardBody>
        This card has now shadow below.
      </CardBody>
      <CardFooter>
        Footer
      </CardFooter>
    </Card>

    <br/>

    <Card hasBorder={true}>
      <CardHeader>
        Header
      </CardHeader>
      <CardBody>
        This card has a border applied
      </CardBody>
      <CardFooter>
        Footer
      </CardFooter>
    </Card>

    <br/>

    <Card>
      <CardHeader>
        Header
      </CardHeader>
      <CardBody>
        Body
      </CardBody>
      <CardBody>
        Another CardBody
      </CardBody>
      <CardFooter>
        Footer
      </CardFooter>
    </Card>
  </div>
);
