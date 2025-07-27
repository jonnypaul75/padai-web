import { useEffect, useState } from "react";
import type {
  Chapter,
  ChapterDataResponse,
} from "../../types/chapter-contents";
import { apiProxyRequest } from "../../lib/api-client-proxy";
import type { ToggleSection } from "../../types/common";
import SelectChapter from "./select-chapters";
import SelectSubject from "./select-subject";

interface Props {
  classId: string | null;
  toggleFunction: (section: ToggleSection) => void;
  onSelectResource: (resourceId: string | null) => void;
}

const ChapterSelector = ({
  classId,
  toggleFunction,
  onSelectResource,
}: Props) => {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);

  const resetToSubjectSelection = () => {
    setSelectedSubject(null);
    setChapters([]);
  };

  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubject) return;
      setLoading(true);
      try {
        const result = await apiProxyRequest<
          ChapterDataResponse,
          { subject_id: number }
        >("POST", "Content/getChapters", { subject_id: selectedSubject });
        setChapters(result?.chapters || []);
      } catch (error) {
        console.error("Failed to load chapters", error);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [selectedSubject]);

  return (
    <>
      {!selectedSubject && (
        <div className="filter-item chapter-list-item overflow-auto h-100">
          <SelectSubject
            classId={classId}
            onSelectSubject={(subjectId) => setSelectedSubject(subjectId)}
          />
        </div>
      )}

      {selectedSubject && loading && <p>Loading chapters...</p>}

      {selectedSubject && chapters.length > 0 &&  (
        <div className="filter-item chapter-list-item overflow-auto h-100">
          <SelectChapter
            chapters={chapters}
            toggleFunction={toggleFunction}
            onSelectResource={onSelectResource}
            onBackToSubject={resetToSubjectSelection}
          />
        </div>
      )}
    </>
  );
};

export default ChapterSelector;
