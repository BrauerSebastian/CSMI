'use client';

import { Input } from '@/components/ui/input';
import { Card, CardContent } from '../ui/card';

interface SerachBarProps {
  data: string;
}

const SearchBar: React.FC<SerachBarProps> = ({ data }) => {
  return (
    <div>
      <Input
        placeholder="busaca un misionero"
        value={data}
        onChange={() => {}}
      />
      <Card>
        <CardContent>
          <ul></ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBar;
