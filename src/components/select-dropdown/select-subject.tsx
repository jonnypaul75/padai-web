import { useEffect, useState } from "react";
import type {
  SubjectApiResponse,
  SubjectResponseData,
} from "../../types/class-section";
import { apiProxyRequest } from "../../lib/api-client-proxy";

interface Props {
  onSelectSubject: (subjectId: number | null) => void;
  classId: string | null;
}

const SelectSubject = ({ classId,onSelectSubject }: Props) => {
  const [SubjectOptions, setSubjectOptions] = useState<SubjectResponseData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!classId) return;
      setLoading(true);
      try {
        const result = await apiProxyRequest<
          SubjectApiResponse,
          { school_id: string; class_id: string }
        >("POST", "Content/getSubjects", {
          school_id: "23",
          class_id: classId,
        });

        const subjectData = result?.data ?? [];
        setSubjectOptions(subjectData);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
        setSubjectOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [classId]);
  
  if (!SubjectOptions?.length && !loading) return <p>No classes loaded yet.</p>;
  return (
    <div className="">
      <div className={``}>
        <h2 className="select-chapter">Select a Subject</h2>
        <ul className="mt-3 ms-0">
          {SubjectOptions?.map((item, index) => (
            <li key={index} className="mb-2 chapter-list" onClick={() => onSelectSubject(item.subject_id)}>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  {
                    item.image ?
                    <img src={item.image} className="w-100" />
                    :
                    <img src="/ongoing-2.webp" alt="" />
                  }
                </div>
                <div>
                  <span className="d-block title">{item.subject_name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectSubject;
