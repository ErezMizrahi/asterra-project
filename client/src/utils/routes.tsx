import Forms from "../components/Forms";
import Home from "../components/Home";
import Layout from "../components/Layout";

export const routes = [
    {
      element: <Layout />,
      namespace: 'protected',
      children: [
            {
                path: '/',
                name: 'Home',
                element: (<Home />),
            },
            {
                path: '/forms',
                name: 'Forms',
                element: (<Forms />),
            },
        ]
    }
  ];