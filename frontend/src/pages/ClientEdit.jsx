import ClientForm from '../components/ClientForm';

const ClientEdit = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientForm isEdit={true} />
      </div>
    </div>
  );
};

export default ClientEdit;