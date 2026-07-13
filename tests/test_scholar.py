import json
import tempfile
import unittest
from pathlib import Path

from api.scholar import extract_metrics, fetch_scholar_data, write_json_atomic


SAMPLE_RESPONSE = {
    "author": {"name": "Wangbing Li"},
    "cited_by": {
        "table": [
            {"i10_index": {"all": 3}},
            {"citations": {"all": 75}},
            {"h_index": {"all": 5}},
        ]
    },
}


class FakeResponse:
    status_code = 200

    def json(self):
        return SAMPLE_RESPONSE


class FakeSession:
    @staticmethod
    def get(*args, **kwargs):
        return FakeResponse()


class ScholarUpdaterTests(unittest.TestCase):
    def test_extracts_metrics_without_table_order_dependency(self):
        self.assertEqual(
            extract_metrics(SAMPLE_RESPONSE),
            {"citations_all": 75, "h_index_all": 5, "i10_index_all": 3},
        )

    def test_rejects_incomplete_api_response(self):
        with self.assertRaises(ValueError):
            extract_metrics({"cited_by": {"table": []}})

    def test_fetch_builds_frontend_snapshot(self):
        data = fetch_scholar_data("test-key", session=FakeSession)
        self.assertEqual(data["citations_all"], 75)
        self.assertEqual(data["profile_url"], "https://scholar.google.com/citations?user=mczdUnAAAAAJ")
        self.assertIn("last_updated", data)

    def test_atomic_writer_outputs_valid_json(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "scholar_data.json"
            write_json_atomic({"citations_all": 75}, output)
            self.assertEqual(json.loads(output.read_text(encoding="utf-8")), {"citations_all": 75})


if __name__ == "__main__":
    unittest.main()
