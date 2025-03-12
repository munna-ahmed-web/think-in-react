import { PageHeader } from "./components/PageHeader";
import { UserFilter } from "./components/UserFilter";
import { UserProvider } from "./UserProvider";
import { ResetButton } from "./components/ResetButton";
import { UserSearch } from "./components/UserSearch";
import { UserTable } from "./components/UserTable";
import { useUserContext } from "./hooks/useUserContext";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { Pagination } from "../../components/ui/pagination";

export const UserManagement = () => {
  return (
    <UserProvider>
      <UserManagementContent />
    </UserProvider>
  );
};

UserManagement.displayName = "UserManagement";

const UserManagementContent = () => {
  const { isLoading, error } = useFetchUsers();
  const { pagination, updatePage, updatePageSize, users } = useUserContext();
  return (
    <div>
      <PageHeader />
      <div className="mt-6" />
      <div className="space-y-6">
        <div className="space-y-2">
          <UserFilter />
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <UserSearch />
            </div>
            <div>
              <ResetButton />
            </div>
          </div>
        </div>
        <UserTable
          users={users}
          isLoading={isLoading}
          error={error?.message ? "" : undefined}
        />
        <Pagination
          key={`${pagination.page}-${pagination.pageSize}`}
          totalPages={pagination.totalPage}
          currentPage={pagination.page}
          onPageChange={updatePage}
          onPageSizeChange={updatePageSize}
          pageSize={pagination.pageSize}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

UserManagementContent.displayName = "UserManagementContent";
