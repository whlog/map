import { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';

const usePermissionCheck = (permissions: string[], ...other: string[]): boolean[] => {
  const { path } = useRouteMatch();

  const auth = useMemo(() => {
    const _permissions = new Set(permissions);

    return other.map(key => _permissions.has(`${path}/${key}`));
  }, [permissions, other, path]);

  return auth;
};

export default usePermissionCheck;
