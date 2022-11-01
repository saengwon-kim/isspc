from django.http import JsonResponse
from django.test import TestCase


class ApiTest(TestCase):
    def test_spc(self):
        response = self.client.get('/api/isspc?barcode=880106837671')
        self.assertEqual(type(response), JsonResponse)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["isSPC"])

    def test_not_spc(self):
        response = self.client.get('/api/isspc?barcode=12341234')
        self.assertEqual(response.status_code, 404)
