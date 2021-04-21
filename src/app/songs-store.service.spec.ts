import { TestBed } from '@angular/core/testing'

import { SongsStoreService } from './songs-store.service'

describe('SongsStoreService', () => {
  let service: SongsStoreService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SongsStoreService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
