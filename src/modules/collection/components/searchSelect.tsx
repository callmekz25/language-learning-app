import { useState } from 'react';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import type { UserType } from '@/modules/user/types/user';

const SearchSelect = ({
  users,
  onChange,
}: {
  users: UserType[];
  onChange: (value: UserType[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserType[]>([]);

  const toggleUser = (user: UserType) => {
    const exists = selected.some((u) => u.id === user.id);

    let newValue;
    if (exists) {
      newValue = selected.filter((u) => u.id !== user.id);
    } else {
      newValue = [...selected, user];
    }

    setSelected(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full font-normal py-5 justify-between">
            Select email
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="p-0 w-[500px]">
          <Command>
            <CommandInput placeholder="Search email…" className="" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                {users.map((user) => {
                  const isSelected = selected.some((u) => u.id === user.id);
                  return (
                    <CommandItem
                      key={user.id}
                      value={user.email}
                      className="py-3"
                      onSelect={() => toggleUser(user)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                      />
                      {user.email}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-1 bg-accent px-2.5 py-1.5 rounded-full text-sm"
          >
            {user.email}
            <button onClick={() => toggleUser(user)} className="hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchSelect;
