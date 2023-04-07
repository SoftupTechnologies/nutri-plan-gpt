import Modal from './Modal';

interface Props {
  errorMessage?: string;
  clearError: VoidFunction;
}

const ErrorFeedbackModal: React.FC<Props> = ({
  errorMessage,
  clearError,
}) => (
  <Modal
    showModal={Boolean(errorMessage)}
    setShowModal={clearError}
  >
    <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl">
      <div className="mt-3 text-center sm:mt-0 sm:text-left">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Error
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  </Modal>
);

export default ErrorFeedbackModal;


